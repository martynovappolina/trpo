from locust import HttpUser, TaskSet, task, between

class UserBehavior(TaskSet):
    @task
    def login(self):
        self.client.post("/api/users/login?login=user&password=123")

    @task
    def get_events(self):
        self.client.get("/api/events/getByOrganizationID?id=550e8400-e29b-41d4-a716-446655440000")

class WebsiteUser(HttpUser):
    wait_time = between(5, 9)
    tasks = [UserBehavior]
