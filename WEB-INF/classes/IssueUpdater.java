
import java.sql.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class IssueUpdater extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public IssueUpdater() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		Connection con = null;
		Statement stmt = null;
		ResultSet rs = null;
		
		PrintWriter out = response.getWriter();
		String inputTheme = request.getParameter("inputTheme");
		String inputThemeDescrip = request.getParameter("inputThemeDescrip");
		
		try {

			Class.forName("org.postgresql.Driver");

			con = DriverManager.getConnection(
					"jdbc:postgresql://localhost:54321/geoserver", "postgres",
					"postgres");
			
			PreparedStatement ps = con.prepareStatement("UPDATE public.\"THEME\" SET \"Description\" = ? WHERE \"Name\" LIKE ?");
			ps.setString(1,inputThemeDescrip);
			ps.setString(2,"%" + inputTheme + "%");
			
			ps.executeUpdate();
			ps.close();

		} catch (ClassNotFoundException e) {
			out.println("Couldn't load database driver: " + e.getMessage());
		} catch (SQLException e) {
			out.println("SQLException caught: " + e.getMessage());
		} finally {
			
			try {
				if (con != null)
					con.close();
			} catch (SQLException ignored) {
			}
		}
		
	}

}
