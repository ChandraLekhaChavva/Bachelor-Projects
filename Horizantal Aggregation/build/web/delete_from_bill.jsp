<%@ page import="java.sql.*,java.util.*" %>

<%! 
	Connection con;
	ResultSet rs,rs1;
	Statement st,st1;
%>

<html>
<body>
<p>&nbsp;</p>
<%
Class.forName("com.mysql.jdbc.Driver");
	Connection con=DriverManager.getConnection("jdbc:mysql://localhost:3306/horizontal", "root", "pass");
	String mno = request.getParameter("mno");
	st=con.createStatement();

	String jy = "delete from billing where mno="+mno;

	 st.executeUpdate(jy);
%>
<h3 align ="center" > Deleted </h3>
