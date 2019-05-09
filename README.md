# cardiology-bullseye

Bullseye is a component used in echocardiology.
This component is written in Angular 2 and updated to Angular 7.
Refactoring must be done.

## Run

After to install all packages

    npm install

Run the program

    ng serve

## How it works

One the program is running, you can see 4 sections:

- Choose View: for choosing the view to show (not all work)
- Strees Echo: through interactive component, you can change the color of each segment wheeling the mouse
- Legend: the meaning of the colors
- Events: events fired

One the application runs, choosing a view on the left section, the related rappresentation will appear in the Stress Echo section. You can interact with each segment wheeling the mouse.

## Some words on Kubernetes

The question is "What does this have to do with this"?

Nothing, but I took this project as a starting point to deploy on Kubernetes, through Azure DevOps in a Continous Deployment Environment.
So in the following there will be some considerations.

But before it's essential to create a image and push it on a repository with the image of this application.

I have my own repository on Docker Hub: antpass79/bulleye.

To create it, go under the root folder and type:

    docker image build -t bulleye .
    docker tag bulleye antpass79/bulleye
    docker push antpass79/bulleye

If you are not logged, type:

    docker login

and pass the right credentials.

Now you have an image with the defalut tag "latest" as the version.

Now you can read this article to publish on Kubernetes:

    https://docs.microsoft.com/en-us/azure/aks/kubernetes-walkthrough

Changing some small things on the yaml file, type:

    kubectl apply -f k8s.yaml

At this point, after a short time, you can browse you the application on Internet. To see what ip you have to use, type:

    kubectl get service bulleye --watch

Wait for EXTERNAL-IP has a valid value (not "pending").
