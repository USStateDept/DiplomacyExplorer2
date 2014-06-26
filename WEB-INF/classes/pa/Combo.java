
package pa;

import java.sql.*;
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
	Connection con;

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
			//if(type.equals("issueCombo"))
			//	loadCombo(request, response);
			if(type.equals("issueText"))
				loadText(request, response);
		} catch (SQLException e) {

			e.printStackTrace();
		} catch (ClassNotFoundException e) {

			e.printStackTrace();
		}

	}

	/*protected void loadCombo(HttpServletRequest request,
		HttpServletResponse response) throws ServletException, IOException,
	SQLException, ClassNotFoundException {

		String type = request.getParameter("type");

		DataAccessor da = new DataAccessor();

		String[] params = { };
		String sql="";
		ArrayList<String> rows = new ArrayList<String>();

		if(type.equals("issueCombo"))
			sql = "select \"Name\" from public.\"Issue\"";

		rows = da.select(params, sql, "Name");
		String html="";


		for(int i =0;i<rows.size();i++){
			String row = rows.get(i);
			html+="<option>"+row+"</option>";
		}

		PrintWriter out = response.getWriter();
		out.println(html);
	}*/

	protected void loadText(HttpServletRequest request,
		HttpServletResponse response) throws ServletException, IOException,
	SQLException, ClassNotFoundException {

		String type = request.getParameter("type");
		String name = request.getParameter("name");
		//name=name.replace("+"," ");

		DataAccessor da = new DataAccessor();

		String[] params = { };
		String sql="";

		if(type.equals("issueText"))
			sql = "select \"Legend\" from public.\"Issue\" where \"Name\" like '%" + name + "%'";

		ResultSet rs = da.select(params, sql);
		String legend="";

		while(rs.next()){
		legend = rs.getString("Legend");
		}

		PrintWriter out = response.getWriter();
		out.println(legend);
	}

}
