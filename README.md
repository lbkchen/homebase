# Homebase

A personal homepage

## Install

Install python requirements from Pipfile

```
cd backend
pipenv install
```

Install client side requirements with `npm` (check `package.json` for node version)

```
npm install
```

## Development

Run Django backend server on http://localhost:8000

```
# If not already you need to use the Python environment shell
pipenv shell

cd backend
python manage.py runserver
```

Run NextJS React client on http://localhost:3000

```
npm run dev
```

## Deploy

TBD
