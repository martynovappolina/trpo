from app import app
from fastapi.testclient import TestClient

client = TestClient(app)

def test_login_success():
    response = client.post("/api/users/login?login=user&password=123")
    assert response.status_code == 200
    assert response.json()["is_ok"] == True
    assert "token" in response.json()
    assert "organizationID" in response.json()

def test_login_failure():
    response = client.post("/api/users/login?login=user&password=1234")
    assert response.status_code == 200
    assert response.json()["is_ok"] == False
    assert "error" in response.json()

