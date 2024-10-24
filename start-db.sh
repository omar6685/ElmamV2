docker container remove elmam-db
docker run -d --name elmam-db -e POSTGRES_USER=moyasar -e POSTGRES_PASSWORD="3tzmLBvukVVlDkA2bmdhtqwQSEkSoZTr" -e POSTGRES_DB=moyasar_23rf -p 5432:5432 postgres:13
