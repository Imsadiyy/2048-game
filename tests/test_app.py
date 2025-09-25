import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import app   # now works

@pytest.fixture
def client():
    app.app.testing = True
    with app.app.test_client() as client:   # note app.app here
        yield client

def test_index_returns_200(client):
    res = client.get("/")
    assert res.status_code == 200
