# backend/tests/conftest.py

import pytest
from fastapi.testclient import TestClient
from unittest.mock import AsyncMock, patch

from app.main import app

@pytest.fixture
def client():
    return TestClient(app)
