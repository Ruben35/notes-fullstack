python -m venv venv  
.\venv\Scripts\activate
pip install -r requirements.txt

uvicorn main:app --reload --port 5000 --host 0.0.0.0
