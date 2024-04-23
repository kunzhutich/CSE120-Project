from locust import HttpUser, task, between

class ApiUser(HttpUser):
    wait_time = between(1, 2)  # Simulated users will wait between 1 and 2 seconds between tasks

    @task
    def get_data(self):
        self.client.get("/forders")  # Replace "/your_endpoint" with the path you want to test
