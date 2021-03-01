FROM python:3.9.2-alpine3.13

RUN apk update && apk upgrade && apk add bash

WORKDIR /usr/src/app

COPY requirements.txt .
RUN pip install -r requirements.txt

#ENTRYPOINT ["python", "twitter_viewer/manage.py", "runserver", "0.0.0.0:8000"]
ENTRYPOINT bash

EXPOSE 8000
