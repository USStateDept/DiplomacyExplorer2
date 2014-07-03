<%@page
    import="java.io.*,
            java.net.*"
    contentType="text/json; charset=UTF-8"
    
%><%
        StringBuffer sbf = new StringBuffer();
        String reqUrl =  request.getParameter("url");
        //Access the page
        try {
        		String cleanURL = URLDecoder.decode(reqUrl, "UTF-8");
                URL url = new URL(cleanURL);
                BufferedReader in = new BufferedReader(new InputStreamReader(url.openStream()));
                String inputLine;
                while ( (inputLine = in.readLine()) != null) sbf.append(inputLine);
                in.close();
        } catch (MalformedURLException e) {
        } catch (IOException e) {
        }
        out.print(sbf.toString());
%>

