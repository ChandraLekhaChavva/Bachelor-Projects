<%@ page import="java.sql.*,java.util.*" %>

<%! 
	Connection con,con1;
	ResultSet rs,rs1;
	Statement st,st1;
	String cname,residential,commericial;
%>

<html>
    <body>
<%

Class.forName("com.mysql.jdbc.Driver");
	Connection con=DriverManager.getConnection("jdbc:mysql://localhost:3306/horizontal", "root", "pass");

	
	
st=con.createStatement();
	
	String jy="select * from circle";
%>
<form action="pivotbill.jsp" method="GET">
<table align="center" width="283">
<tr> <td width="229" align="center">  
  <font face="Franklin Gothic Medium" size="5" color="#FF0000">Circle Name </font> </td> </tr>
<tr> <td width="229" align="center"> <b><font face="Courier New" size="4">Select The Circle Name 
   </font></b>  </td>
	<td width="44">
		<select name="name">
		<%
	rs=st.executeQuery(jy);
	while(rs.next())
	{
	%>
	<option> <% out.println(rs.getString(2));%></option>
	<%
	}
	%>
	</select>
	</td>
	</tr>
	<tr><td> <input type="Submit" value="Submit"></td></tr>
</table>
</form>
    </body>
</html>



