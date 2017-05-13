<%
String type = request.getParameter("type");
out.println(type);

if (type.equals("commercial"))
{
	response.sendRedirect("commercial_bill1.jsp");
}
else
if(type.equals("residential"))
{
	response.sendRedirect("residential_bill1.jsp");
}
%>