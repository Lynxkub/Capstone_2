Capstone 2 proposal

Manny’s Garage

What tech stack will you use?
    Node/React

Is the front-end UI or the back-end going to be the focus of your project? Or are you going to make an evenly focused full-stack application?
   - I intend for this project to be an evenly focused full-stack application.

Will this be a website? A mobile application? Something else?
   - This will be a website that has admin/user privileges for 2 different sides of the website

What goal will your project be designed to achieve?
   - The goal of this project is to design a functional website for a car mechanic to be able to pull up car data to help their customers and manage their own personal work schedule

 What kind of users will visit your app?
   - The mechanic will have admin abilities in order to look up different details on car repairs (time quotes for repairs , estimated costs, preventative maintenance , parts needed) to best assist their customers. The mechanic will also be able to set their work schedule on this website. 
   - A customer will also be able to access the website. On the user side, they will be able to view services that the mechanic offers and have access to request a time slot for a car repair

 What data do you plan on using?
 -  carMD api - This api has all the information I will need in order to build this website. With this api, api calls can be made that return data such as: engine error codes , car repairs (with details about approx time to complete repair, specific parts needed for each repair, approx cost for parts, approx cost for labor , preventative maintenance suggestions based on the make/model/year/milage of a car)

In brief, outline your approach to creating your project
   1. Database Schema
       - Users-name/email/admin status
       - Mechanic Services - list of services that a mechanic specifies that they are able to do (will have time needed to complete repair, parts needed , 			parts cost , labor cost
   2. What kinds of issues might you run into with your api?
       	- Upper limits of api calls.
       	
   3. Is there any sensitive information you need to secure?
   	- Basic user login information and admin status. The website layout will ideally be different based on the admin status. Admin status will be reserved 			for those that are in charge of the business. 
        - A stretch goal for this capstone is to include an online payment option. So if that is something I can include, I will need to be able to secure 			payment information 
   4. What functionality will your app include?
        - I intend for this project to be able to allow  a mechanic to be able to run/schedule their business from the admin side. The users will be able to 			look up information on their car issues and schedule appointments with the mechanic as appropriate. 
   5. What will the user flow look like?
    	- The mechanic will be able to add specific services that they are able to provide to customers. They will be able to adjust their prices for each 		service. The api will suggest how much it should cost, but the mechanic will be able to adjust as needed. 
        The mechanic will also be able to set their hours of operation and create a calendar for themselves so they can set up appointments. 
        There will also be functionality for the mechanic to help their customers by looking up different engine error codes to help diagnose issues with cars. 
        The user will be able to see services the mechanic can offer as well as pricing information. 
        The user will be able to make a request to the mechanic for a repair. If it fits appropriately into the mechanics set schedule, it will be scheduled.
   7. What features make your site more than a CRUD app? What are your stretch goals?
	- This website is intended to be something that can be used in the real world. Other than making basic api calls, I want to make this a scheduling app.
        	A stretch goal is to include a payment option. If this is possible, I’ll have to work with either Square or Paypal.  
	




