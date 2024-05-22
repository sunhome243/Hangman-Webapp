### Title
The Hangman Game

#### Project Description
This is my very first project to create a fully fuctional web application
The application runs 'Hangman game,' a popular word game around the world

I have used Js, CSS, and HTML for frontend and Pythond for backend
Docker and Minikube are used for containerization and orchestration
I've tested on a local environment and the Minikube environment

### How to
- Set up minikube and docker environment

- Use dockerfile to create an image of the image **after downloading all the code files**
OR
Use docker load -i hangman-image.tar **after downloading only the hangman-image file (don't forget to unzip)**

- Use kubectl apply -f deployment.yaml (change directory direction if needed)
(Use kubectl get pods to check everything is working)

- Use kubectl apply -f service.yaml
(Use kubectl get service to check everything is working)

- Use minikube service hangman-service

Now, Minikube will open the web browser for you!
