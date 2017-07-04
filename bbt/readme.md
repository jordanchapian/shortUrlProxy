## Blackbox Testing

It is anticipated that bbtests be run against the artifact produced by the project.
For example, if the api service lived in a project by itself, the endpoints would be 
covered by bbts in that project. With the time constraints, I think that I can get the 
most regression tracking benefits by running bbts through the nginx container.