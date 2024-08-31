FROM python:3.10.12

WORKDIR /app

COPY requirements.txt ./
RUN python3 -m pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app/

CMD [ "python3", "main.py" ]
