from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import jwt, JWTError
from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext 
from typing import Annotated, List
from pydantic import BaseModel
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import pandas as pd



app = FastAPI()



oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


origins = [
  "http://localhost",
  "http://localhost:8080",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://172.24.160.1:5173/"
  "127.0.0.1:58781"
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
  )

class Transaction(BaseModel):
  amount: float
  category: str
  description: str
  is_income: bool
  date: str
  
  
    
class UserCreate(BaseModel):
  username: str
  password: str
  
class TokenData(BaseModel):
    username: str
    
class User(BaseModel):
  id: int
  username: str
  
class DocumentCreate(BaseModel):
    name: str
    file_path: str

class DocumentResponse(BaseModel):
    id: int
    name: str
    file_path: str
    is_checked: bool

    class Config:
        orm_mode = True

class EmployeeCreate(BaseModel):
    email: str
    document_id: int

class EmployeeResponse(BaseModel):
    id: int
    email: str
    document: DocumentResponse

    class Config:
        orm_mode = True
    
def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()
    

    
db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)


#Create User
def get_user_by_username(username: str, db: db_dependency):
  return db.query(models.User).filter(models.User.username == username).first()

def create_user(user: UserCreate, db: db_dependency):
  hashed_password = pwd_context.hash(user.password)
  db_user = models.User(username=user.username, hashed_password=hashed_password)
  db.add(db_user)
  db.commit()
  db.refresh(db_user)
  return db_user

@app.post('/register/')
def register(user: UserCreate, db: Session = Depends(get_db)):
  db_user = get_user_by_username(user.username, db)
  if db_user:
    raise HTTPException(status_code=400, detail="Username already exists")
  return create_user(user, db)

#Login
def authenticate_user(username: str, password: str, db: Session):
  user = get_user_by_username(username, db)
  if not user:
    return False
  if not pwd_context.verify(password, user.hashed_password):
    return False
  return user

def create_access_token(data: dict, expires_delta: timedelta | None = None):
  to_encode = data.copy()
  if expires_delta:
    expire = datetime.now(timezone.utc) + expires_delta
  else:
    expire = datetime.now(timezone.utc) + timedelta(minutes=15)
  to_encode.update({"exp": expire})
  encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
  return encoded_jwt

@app.post('/token/')
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
  user = authenticate_user(form_data.username, form_data.password, db)
  if not user:
    raise HTTPException(
      status_code=401,
      detail="Incorrect username or password",
      headers={"WWW-Authenticate": "Bearer"},
    )
  access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
  access_token = create_access_token(
    data={"sub": user.username}, expires_delta=access_token_expires
  )
  return {"access_token": access_token, "token_type": "bearer", "username": user.username}

#Verify Token
def verify_token(token: str = Depends(oauth2_scheme)):
  try:
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    username: str = payload.get("sub")
    if username is None:
      raise HTTPException(status_code=403, detail="Token is invalid or expired")
    return payload
  except JWTError:
    raise HTTPException(status_code=403, detail="Token is invalid or expired")

@app.get('/verify-token/{token}')
async def verify_user_token(token: str):
  verify_token(token)
  return {"message": "Token is valid"}


#Employee and Document
@app.post("/documents/", response_model=DocumentResponse)
def create_document(document: DocumentCreate, db: Session = Depends(get_db)):
    db_document = models.Document(name=document.name, file_path=document.file_path)
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document

@app.get("/documents/", response_model=List[DocumentResponse])
def get_documents(db: Session = Depends(get_db)):
    return db.query(models.Document).all()

@app.put("/documents/{document_id}/check", response_model=DocumentResponse)
def check_document(document_id: int, db: Session = Depends(get_db)):
    document = db.query(models.Document).filter(models.Document.id == document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    document.is_checked = not document.is_checked
    db.commit()
    db.refresh(document)
    return document

@app.post("/employees/", response_model=EmployeeResponse)
def create_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    document = db.query(models.Document).filter(models.Document.id == employee.document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    db_employee = models.Employee(email=employee.email, document_id=employee.document_id)
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee

@app.get("/employees/", response_model=List[EmployeeResponse])
def get_employees(db: Session = Depends(get_db)):
    return db.query(models.Employee).all()

@app.get("/employees/{employee_id}", response_model=EmployeeResponse)
def get_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee


    
from pydantic import BaseModel
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import pandas as pd



app = FastAPI()



oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


origins = [
  "http://localhost",
  "http://localhost:8080",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://172.24.160.1:5173/"
  "127.0.0.1:58781"
]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
  )

class Transaction(BaseModel):
  amount: float
  category: str
  description: str
  is_income: bool
  date: str
  
  
    
class UserCreate(BaseModel):
  username: str
  password: str
  
class TokenData(BaseModel):
    username: str
    
class User(BaseModel):
  id: int
  username: str
  
class DocumentCreate(BaseModel):
    name: str
    file_path: str

class DocumentResponse(BaseModel):
    id: int
    name: str
    file_path: str
    is_checked: bool

    class Config:
        orm_mode = True

class EmployeeCreate(BaseModel):
    email: str
    document_id: int

class EmployeeResponse(BaseModel):
    id: int
    email: str
    document: DocumentResponse

    class Config:
        orm_mode = True
    
def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()
    

    
db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)


#Create User
def get_user_by_username(username: str, db: db_dependency):
  return db.query(models.User).filter(models.User.username == username).first()

def create_user(user: UserCreate, db: db_dependency):
  hashed_password = pwd_context.hash(user.password)
  db_user = models.User(username=user.username, hashed_password=hashed_password)
  db.add(db_user)
  db.commit()
  db.refresh(db_user)
  return db_user

@app.post('/register/')
def register(user: UserCreate, db: Session = Depends(get_db)):
  db_user = get_user_by_username(user.username, db)
  if db_user:
    raise HTTPException(status_code=400, detail="Username already exists")
  return create_user(user, db)

#Login
def authenticate_user(username: str, password: str, db: Session):
  user = get_user_by_username(username, db)
  if not user:
    return False
  if not pwd_context.verify(password, user.hashed_password):
    return False
  return user

def create_access_token(data: dict, expires_delta: timedelta | None = None):
  to_encode = data.copy()
  if expires_delta:
    expire = datetime.now(timezone.utc) + expires_delta
  else:
    expire = datetime.now(timezone.utc) + timedelta(minutes=15)
  to_encode.update({"exp": expire})
  encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
  return encoded_jwt

@app.post('/token/')
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
  user = authenticate_user(form_data.username, form_data.password, db)
  if not user:
    raise HTTPException(
      status_code=401,
      detail="Incorrect username or password",
      headers={"WWW-Authenticate": "Bearer"},
    )
  access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
  access_token = create_access_token(
    data={"sub": user.username}, expires_delta=access_token_expires
  )
  return {"access_token": access_token, "token_type": "bearer", "username": user.username}

#Verify Token
def verify_token(token: str = Depends(oauth2_scheme)):
  try:
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    username: str = payload.get("sub")
    if username is None:
      raise HTTPException(status_code=403, detail="Token is invalid or expired")
    return payload
  except JWTError:
    raise HTTPException(status_code=403, detail="Token is invalid or expired")

@app.get('/verify-token/{token}')
async def verify_user_token(token: str):
  verify_token(token)
  return {"message": "Token is valid"}


#Employee and Document
@app.post("/documents/", response_model=DocumentResponse)
def create_document(document: DocumentCreate, db: Session = Depends(get_db)):
    db_document = models.Document(name=document.name, file_path=document.file_path)
    db.add(db_document)
    db.commit()
    db.refresh(db_document)
    return db_document

@app.get("/documents/", response_model=List[DocumentResponse])
def get_documents(db: Session = Depends(get_db)):
    return db.query(models.Document).all()

@app.put("/documents/{document_id}/check", response_model=DocumentResponse)
def check_document(document_id: int, db: Session = Depends(get_db)):
    document = db.query(models.Document).filter(models.Document.id == document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    document.is_checked = not document.is_checked
    db.commit()
    db.refresh(document)
    return document

@app.post("/employees/", response_model=EmployeeResponse)
def create_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    document = db.query(models.Document).filter(models.Document.id == employee.document_id).first()
    if not document:
        raise HTTPException(status_code=404, detail="Document not found")
    db_employee = models.Employee(email=employee.email, document_id=employee.document_id)
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee

@app.get("/employees/", response_model=List[EmployeeResponse])
def get_employees(db: Session = Depends(get_db)):
    return db.query(models.Employee).all()

@app.get("/employees/{employee_id}", response_model=EmployeeResponse)
def get_employee(employee_id: int, db: Session = Depends(get_db)):
    employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee


    
