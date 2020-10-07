
## BUGGIT
[http://cis-linux2.temple.edu:8080/SP20_3308_tug70814/](http://cis-linux2.temple.edu:8080/SP20_3308_tug70814/index.html#/home)  
A (almost) social media site that is supposed to be the combination of Reddit and Stackoverflow. Or at least that's what it is intended to be.
I created this with vanilla JS, HTML and CSS for the Web Dev course at Temple University.

## Site Images
![Homepage](https://github.com/zahego/Buggit/blob/master/web/img/screenshot/Untitled.png)
![Coming Soon Page](https://github.com/zahego/Buggit/blob/master/web/img/screenshot/Untitled2.png)
![LogIn page](https://github.com/zahego/Buggit/blob/master/web/img/screenshot/Untitled3.png)
![Data page](https://github.com/zahego/Buggit/blob/master/web/img/screenshot/Untitled4.png)

## Motivation
Ever wonder what would happen if Stack Overflow is more like a social media where one could earn social point and upvote and scroll through some com sci meme? Yeah, me neither. But I need a new idea to break through from my normal design pattern so here it is.

## Getting Started
These instructions will guild you through the inital setting up process and 
highlight what the apps can do for you to explore on your own.  
In case you would like to make this project your own, you will need your own MySQL database set up and got it hooked to the JDBC manager. The field of the database much match the field name seen in the src/model/***/stringData.java


## Notable feature
- Single Page Application (main content that is) with dynamic JS injected content  
- Self made APIs using JSP 
- CRUD functionalities, log on/off, filter, etc...
- SQL injection prevention with preparedStatement
- AJAX
- REST
- Vuejs intergration for a dragaable chat box
- Highly customized with css. From title, footer to scroll bar
- Audio autoplay at Page/Demo, even on Chrome, which is extremely difficult since Chrome new policy on audio autoplay
- Many reusable JS components. Many reusable component create the whole HTML interface with functionlaity similar to a React component
- Detailed tutorial with codePen iframe
- Count down function in Page/Demo
- A dynamic component of coming soon page at Page/Demo

## Sections
- Navigation bar
- Search 
- Page
- Account
- Home
- Blog
- Messaging (coming soon)


## Prerequisite
a server like [Glassfish](https://javaee.github.io/glassfish/) or [Tomcat](http://tomcat.apache.org/),   
or [VsCode live server plugin](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)  
[MySQL](https://www.mysql.com/products/workbench/) if you want to host your own data


## Recommendation
[Netbean Glassfish/Tomcat support bundle](https://netbeans.org/downloads/8.2/rc/)


## Installing and Running
Clone the remote to your local repo
```
git clone https://github.com/zahego/Buggit.git
```
run the file on server, or if run on Netbean with web support bundle, just click 'Run'  
explore the functionalities  


## What you can do
- try insert, delete and update some data  
- try follow the tutorials on Page/Tutorial  
- listen to some sick beat on Page/Demo  
- log on/log off using the information on Account/Log on and Account/Log off  
- play with the chat box on Home  
- read about my weekly strugle on Blog
- enjoy

## API reference
Youtube Player API

## Technologies stack
Framework: [Vuejs](https://vuejs.org/)  
web: HTML, CSS, JS,  
server: JSP, Java, MySQL  
JAR: [gson-2.6.2.jar](https://repo1.maven.org/maven2/com/google/code/gson/gson/2.6.2/),
[mysql-connector-java-5.1.46-bin.jar](https://dev.mysql.com/downloads/connector/j/5.1.html)  
ssh: Putty  
sftp: WinSCP    
server: Glassfish, Apache  


## Contributors
Minh Tran 


## License
This project is licensed under the MIT License

## Challenges and resolutions
check out the [blog](http://cis-linux2.temple.edu:8080/SP20_3308_tug70814/index.html#/blog) section on the page, where I recorded the experience I had while building the page
