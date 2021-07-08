FROM python:3.9.5-alpine3.13

RUN apk update && apk upgrade && apk add bash

WORKDIR /usr/src/app

COPY requirements.txt .
RUN pip install -r requirements.txt

EXPOSE 8000

