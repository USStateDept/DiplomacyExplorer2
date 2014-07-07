package pa;

import java.io.*;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.json.simple.JSONObject;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Updater extends HttpServlet {
	private static final long serialVersionUID = 1L;
	//Connection con;

	public Updater() {
		super();
	}

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		PrintWriter out = response.getWriter();

		String type = request.getParameter("type");

		out.println(type);

		try {
			 if (type.equals("1")) {
				updateIssue(request, response);
			}
			
		}  catch (ClassNotFoundException e) {

			e.printStackTrace();
		}


	}


	protected void updateIssue(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException, ClassNotFoundException {

		String name = request.getParameter("inputIssue");
		String inputIssueLegend = request.getParameter("inputIssueLegend");
		
		
		try{
		JSONParser parser = new JSONParser();
		String fileloc="C:\\OpenGeo\\webapps\\DiplomacyExplorer2\\jsonFile\\";
		String fullLoc = fileloc+name;
		JSONObject jsonObject = (JSONObject) parser.parse(new FileReader(fullLoc));
		
		jsonObject.put("categoryDescription",inputIssueLegend);
		
		FileWriter file = new FileWriter(fullLoc);
		file.write(jsonObject.toJSONString());
		file.flush();
		file.close();
		
		} catch (ParseException e){ 
			
			e.printStackTrace();
		}
		catch( IOException e) {
			
		}
		
	}
	
	

}
