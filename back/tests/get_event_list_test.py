from app import app
from fastapi.testclient import TestClient

client = TestClient(app)

def test_get_event_list_success():
    response = client.get("/api/events/getByOrganizationID?id=550e8400-e29b-41d4-a716-446655440000")
    assert response.status_code == 200
    assert response.json()["is_ok"] == True
    assert "data" in response.json()


