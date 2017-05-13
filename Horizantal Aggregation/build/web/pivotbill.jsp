<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns="http://www.w3.org/TR/REC-html40">




<BODY bgColor=#FFFFFF>


<p><b><font face="AC" size="4">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;



<%@ page import="java.sql.*,java.util.*" %>

<%! 
	Connection con;
	ResultSet rs,rs1;
	Statement st,st1;
	String cname,commercial,residential;
%>
<%
try 
{
Class.forName("com.mysql.jdbc.Driver");
	Connection con=DriverManager.getConnection("jdbc:mysql://localhost:3306/horizontal", "root", "pass");

	String empid = request.getParameter("cname");
	
st=con.createStatement();
	String jy="select * from pivot where cname="+empid+"";
	
	 rs=st.executeQuery(jy);
	if(rs.next())
	{
%>
<form action="bill_reg.jsp">
<table align="center" width="399">
<tr><td width="393">
<table align="center" width="404" height="90">

<tr><td colspan="2" width="278" height="1"> 
  <p align="center"><b><font face="Monotype Corsiva" size="5" color="#FF0000">
 circle details </font></b> </td></tr>

<tr><td width="244" align="right" height="23" dir="ltr" bgcolor="#00FF00"> <b><font face="Courier New" size="4">name
  </font></b> </td>
    <td width="244" align="right" height="23" dir="ltr" bgcolor="#FFFF00"> <b><font face="Courier New" size="4">residential
  </font></b> </td><td width="244" align="right" height="23" dir="ltr" bgcolor="#00FF00"> <b><font face="Courier New" size="4">commercial
  </font></b> </td>
	</tr>
<tr>
    <td width="150" height="23" dir="ltr" bgcolor="#00FF00"> <%cname = rs.getString(1);%>
<input type="hidden" name="cname" value="<%out.println(cname);%>"><%out.println(cname);%></td>
   <td width="150" height="23" dir="ltr" bgcolor="#FFFF00"> <%residential = rs.getString(2);%>
<input type="hidden" name="residential" value="<%out.println(residential);%>"><%out.println(residential);%></td>
<td width="150" height="23" dir="ltr" bgcolor="#00FF00"> <%commercial = rs.getString(3);%>
<input type="hidden" name="commerical" value="<%out.println(commercial);%>"><%out.println(commercial);%></td>
</tr>




</font></b>
<%
	}
	}
	catch (Exception e)
	{
		out.println(e);
	}
	%>
</BODY>
</html>