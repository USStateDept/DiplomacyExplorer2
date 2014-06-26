package pa;

import java.sql.*;
import java.util.*;

public class DataAccessor {
	public ResultSet select(String[] params, String sql)
			throws SQLException {

		Connection con = DriverManager.getConnection(
				"jdbc:postgresql://localhost:54321/geoserver", "postgres",
				"postgres");

		PreparedStatement ps = con.prepareStatement(sql);

		ResultSet rs = ps.executeQuery();

		return rs;
	}

	public void update(String[] params, String sql) throws SQLException {

		Connection con = DriverManager.getConnection(
				"jdbc:postgresql://localhost:54321/geoserver", "postgres",
				"postgres");

		PreparedStatement ps = con.prepareStatement(sql);

		for (int i = 0; i < params.length; i++) {
			ps.setString(i + 1, params[i].toString());
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