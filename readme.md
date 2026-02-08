To run locally, make sure you have flask downloaded, then run:
```
python app.py

```

To run on Docker:
```
docker build -t gotcha .
docker run -p 5002:5002 gotcha

```