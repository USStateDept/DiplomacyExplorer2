import java.sql.*;
import java.util.*;

public class DataAccessor {
	
	public ArrayList<String> select(String[] params,String sql, String sel) throws SQLException {


		Connection con = DriverManager.getConnection(
			"jdbc:postgresql://localhost:54321/geoserver", "postgres",
			"postgres");

		PreparedStatement ps = con.prepareStatement(sql);
		
		ResultSet rs = ps.executeQuery();
		
		//String html="";
		ArrayList<String> html=new ArrayList<String>();
		int i=0;

		while (rs.next()) {

			String name = rs.getString(sel);
		//html+="<option>"+name+"</option>";
			html.add(name);
			i++;
		}
		return html;
	}
	
	public void update(String[] params,String sql) throws SQLException {

		Connection con = DriverManager.getConnection(
			"jdbc:postgresql://localhost:54321/geoserver", "postgres",
			"postgres");

		PreparedStatement ps = con.prepareStatement(sql);

		for(int i=0;i<params.length;i++)
		{
			ps.setString(i+1, params[i].toString());
		}
		
		ps.executeUpdate();
		ps.close();

		try {
			if (con != null)
				con.close();
		} catch (SQLException ignored) {
		}

	}

}
