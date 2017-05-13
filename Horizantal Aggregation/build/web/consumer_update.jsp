<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns="http://www.w3.org/TR/REC-html40">




<BODY bgColor=#FFFFFF>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<font face="AC"><b><a style="text-decoration: none" href="consumer_details.jsp">
<font color="#000000" size="7">Back</font></a></a></b></font></p>


<%@ page import="java.sql.*,java.util.*" %>

<%! 
	Connection con;
	ResultSet rs,rs1;
	Statement st,st1;
%>
<%
try 
{
Class.forName("com.mysql.jdbc.Driver");
	Connection con=DriverManager.getConnection("jdbc:mysql://localhost:3306/horizontal", "root", "pass");
		
String cname = request.getParameter("cname").trim();
String dname = request.getParameter("dname").trim();
String mno = request.getParameter("mno").trim();
String mcname = request.getParameter("mcname").trim();
String name = request.getParameter("name").trim();
String age = request.getParameter("age").trim();
String sex = request.getParameter("sex").trim();
String cno = request.getParameter("cno").trim();
String address = request.getParameter("address").trim();
String type = request.getParameter("type").trim();
String uname = request.getParameter("uname");
String pass = request.getParameter("pass");
	
		
		st1=con.createStatement();



int i = st1.executeUpdate("update consumer set cname='"+cname+"',dname='"+dname+"',mno="+mno+",mcname='"+mcname+"' ,name='"+name+"',age="+age+",sex='"+sex+"',cno="+cno+",address='"+address+"',type='"+type+"',uname='"+uname+"',pass='"+pass+"' where mno ="+mno+"");


if(i==1)
	{
	out.println("<font color=blue size=4><b><center><b><h1>consumer Updated ");
			out.println("<p><h1><font color=blue><b><center><b><center>Thanks</p>");
	}




		}
		catch (Exception e)
		{
			out.println(e);
		}
	%>	