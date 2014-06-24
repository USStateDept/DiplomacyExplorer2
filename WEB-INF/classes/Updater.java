import java.sql.*;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Updater extends HttpServlet {
	private static final long serialVersionUID = 1L;
	Connection con;

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
			if (type.equals("0")) {
				updateTheme(request, response);
			} else if (type.equals("1")) {
				updateIssue(request, response);
			}
			else if (type.equals("2")) {
				updateSubissue(request, response);
			}
		} catch (SQLException e) {

			e.printStackTrace();
		} catch (ClassNotFoundException e) {

			e.printStackTrace();
		}

		// RequestDispatcher dispatcher =
		// getServletContext().getRequestDispatcher("/index.html");
		// dispatcher.forward(request,response);

	}

	protected void updateTheme(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException, SQLException {
		String inputTheme = request.getParameter("inputTheme");
		String inputThemeDescrip = request.getParameter("inputThemeDescrip");

		DataAccessor da = new DataAccessor();
		
		String[] params = { inputThemeDescrip, inputTheme };
		String sql = "UPDATE public.\"Theme\" SET \"Description\" = ? WHERE \"Name\" LIKE ?";

		da.update(params, sql);
		
		
		PrintWriter out = response.getWriter();
		out.print(inputTheme);

		
	}

	protected void updateIssue(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException,
			SQLException, ClassNotFoundException {

		String inputIssue = request.getParameter("inputIssue");
		String inputIssueLegend = request.getParameter("inputIssueLegend");
		String inputLinkText = request.getParameter("inputLinkText");
		String inputLinkURL = request.getParameter("inputLinkURL");
		String inputLinkText2 = request.getParameter("inputLinkText2");
		String inputLinkURL2 = request.getParameter("inputLinkURL2");
		String inputLinkText3 = request.getParameter("inputLinkText3");
		String inputLinkURL3 = request.getParameter("inputLinkURL3");

		DataAccessor da = new DataAccessor();
		
		String[] params = { inputIssueLegend, inputLinkText, inputLinkURL,inputLinkText2, inputLinkURL2,inputLinkText3, inputLinkURL3,inputIssue };

		String sql = "UPDATE public.\"Issue\" SET \"Legend\" = ?, \"Link_Text\"=?, \"Link_URL\"=?, \"Link_Text2\"=?, \"Link_URL2\"=?,\"Link_Text3\"=?, \"Link_URL3\"=? WHERE \"Name\" LIKE ?";
		da.update(params, sql);
		
	}
	
	protected void updateSubissue(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException,
			SQLException, ClassNotFoundException {

		String inputIssue = request.getParameter("inputSubissue");
		String inputIssueLegend = request.getParameter("inputSubissueDescrip");

		DataAccessor da = new DataAccessor();
		
		String[] params = { inputIssueLegend, inputIssue };
		String sql = "UPDATE public.\"Subissue\" SET \"Text\" = ? WHERE \"Name\" LIKE ?";

		da.update(params, sql);
		
	}

}
