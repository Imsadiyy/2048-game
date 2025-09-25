import pytest
import app   

@pytest.fixture
def client():
    app.app.testing = True
    with app.app.test_client() as client:   # note app.app here
        yield client

def test_index_returns_200(client):
    res = client.get("/")
    assert res.status_code == 200
