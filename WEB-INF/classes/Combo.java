import java.sql.*;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
		
		try {
			loadCombo(request, response);
		} catch (SQLException e) {

			e.printStackTrace();
		} catch (ClassNotFoundException e) {

			e.printStackTrace();
		}

	}

	protected void loadCombo(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException,
			SQLException, ClassNotFoundException {
				
				DataAccessor da = new DataAccessor();
				
				String[] params = { };
				String sql = "select \"Name\" from public.\"THEME\"";
				String html = da.select(params, sql);
				
				PrintWriter out = response.getWriter();
				out.println(html);
			}

}
