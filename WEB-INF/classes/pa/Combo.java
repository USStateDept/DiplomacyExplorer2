
package pa;

import java.io.File;
import java.io.FileReader;
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
import java.util.*;

public class Combo extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public Combo() {
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
		
		try {
			
			if(type.equals("issueText"))
				loadText(request, response);
		}  catch (ClassNotFoundException e) {

			e.printStackTrace();
		}

	}

	protected void loadText(HttpServletRequest request,
		HttpServletResponse response) throws ServletException, IOException, ClassNotFoundException {

		String name = request.getParameter("name");
		
		try{
		JSONParser parser = new JSONParser();
		String fileloc="C:\\OpenGeo\\webapps\\DiplomacyExplorer2\\jsonFile\\";
		String fullLoc = fileloc+name;
		JSONObject jsonObject = (JSONObject) parser.parse(new FileReader(fullLoc));
		String legend = (String) jsonObject.get("categoryDescription");
		
		

		PrintWriter out = response.getWriter();
		out.println(legend);
		} catch (ParseException e){ 
			
			e.printStackTrace();
		}
		catch( IOException e) {
			
		}
	}

}
