FROM python:3.8-slim
ENV PYTHONNUNBUFFERED=1
WORKDIR /app
COPY ./requirements.txt .
RUN pip install -r requirements.txt
COPY . /app/
EXPOSE 8000

COPY ./entrypoints.sh .
RUN chmod +x /entrypoints.sh
ENTRYPOINT [ "/app/entrypoints.sh" ]

