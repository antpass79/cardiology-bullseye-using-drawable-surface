# cardiology-bullseye using drawable-surface

the drawable-surface is a component that provides a way to create objects on a canvas. In order to show how it works, the bull-eye app has been developed.

Bullseye is a component used in echocardiology. It shows sections of the heart, splitted in segments, and the physician can change each segment based on the issue of that segment.

## Run

After to install all packages

    npm install

Run the program

    ng serve

## How it works

Once the program run, you can see 4 sections:

- Choose View: for choosing the view to show (not all work) and define the size mode
- Stress Echo: through interactive component, you can change the color of each segment wheeling the mouse or select different segments clicking on them
- Legend: the meaning of the colors. Selected some segments it's possible to change together all them, clicking on an item of the legend
- Events: events fired

## Redux Implementation

With the redux branch, the ngRx 8 library has been used to manage the state of the component.

In order to split the state and the functionalities of single shape, the *mouse interaction handlers* and the *draw function* are put in two separated layers, *MouseHandler* and a hierarchy of *ShapeRenderer*.

In this way *shape* contains only the state for drawing on canvas, points and appearance.

## Some words on Kubernetes (TO BE UPDATED AFTER ADDING DRAWABLE_SURFACE PROJECT)

The question is "What does this have to do with k8s"?

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

Now you have an image with the default tag "latest" as the version.

Now you can read this article to publish on Kubernetes:

    https://docs.microsoft.com/en-us/azure/aks/kubernetes-walkthrough

Changing some small things on the yaml file, type:

    kubectl apply -f k8s.yaml

At this point, after a short time, you can browse the application on Internet. To see what ip you have to use, type:

    kubectl get service bulleye --watch

Wait for EXTERNAL-IP has a valid value (not "pending").

### About private repository

If you have a private repository on Docker Hub, you have to create a secret key to pull the image from k8s.

    kubectl create secret docker-registry <<secretname>> --docker-server=https://index.docker.io/v1/ --docker-username=<<username>> --docker-password=<<password>> --docker-email=<<email>>

The "secretname" must be lowercase.

In the yaml file, add

        imagePullSecrets:
        - name: <<yoursecret>>

under Deployment definition (uncommented the lines).

## References

- <https://medium.com/@peterxjang/a-functional-canvas-approach-with-redux-ce59a369241b>
- <https://auth0.com/blog/developing-games-with-react-redux-and-svg-part-1/>
