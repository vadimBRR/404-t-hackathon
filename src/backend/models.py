from database import Base
from sqlalchemy import Column, Integer, String, Boolean, Float, ForeignKey
from sqlalchemy.orm import relationship

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float)
    category = Column(String, index=True)
    description = Column(String, index=True)
    is_income = Column(Boolean)
    date = Column(String)


class DocumentDetail(Base):
    __tablename__ = "document_details"

    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id"), unique=True)
    is_checked = Column(Boolean, default=False)
    ai_standard_completed = Column(Integer, default=0)  
    benefits_from_signing_it = Column(Integer, default=0)  

    document = relationship("Document", back_populates="detail")

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    file_path = Column(String, nullable=False)

    employees = relationship("Employee", back_populates="document")
    detail = relationship("DocumentDetail", back_populates="document", uselist=False)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    document_id = Column(Integer, ForeignKey("documents.id"))

    document = relationship("Document", back_populates="employees")

    Document.employees = relationship("Employee", back_populates="document")
