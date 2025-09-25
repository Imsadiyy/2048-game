import pytest
import app

@pytest.fixture
def client():
    app.testing = True
    with app.test_client() as client:
        yield client

def test_index_returns_200(client):
    res = client.get("/")
    assert res.status_code == 200
