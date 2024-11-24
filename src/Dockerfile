#vyberiem zakladny obraz
FROM python:3.13-slim


#nainstalujeme potrebny softver
#RUN pip install openai pdfplumber os PyMuPDF fastapi uvicorn
COPY requirements.txt /app/requirements.txt

RUN pip install --no-cache-dir -r /app/requirements.txt


#nakopirujeme zdrojove kody aplikacie
COPY backend/ /app


#nastavime, co sa ma spustit
WORKDIR /app

EXPOSE 8003

CMD ["uvicorn", "fast_api:app", "--host", "0.0.0.0", "--port", "8003"]