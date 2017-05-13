<%@ page import="java.sql.*,java.util.*" %>

<%! 
	Connection con;
	ResultSet rs,rs1;
	Statement st,st1;
%>

<html>
<body>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p align="center"><b><font face="Monotype Corsiva" size="6" color="#FF0000">
View Consumer Details</font></b></p>
<form action="spjview_consumer.jsp" >
<table align="center" width="306">
<tr>
 <td width="252"> <b><font face="Courier New" size="4">Select the Consumer Meter ID</font></b> 
 </td>

 <td width="44">
	<select size="1" name="no1">
	<option> commercial </option>	
	<option> residential </option>
        </select>
 </td>
  </tr>
  <tr><td> <input type="Submit" value="Submit"></td></tr>
 </table>
 </form>
 </body></html>