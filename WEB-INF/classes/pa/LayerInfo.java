package pa;

//import java.sql.*;
import java.io.IOException;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.util.*;
import java.io.BufferedReader;
import java.io.FileReader;

public class LayerInfo {



 	private HashMap parseStringFile(String fileloc){
 		BufferedReader reader = null;
 		HashMap list = new HashMap();
		try {
		    reader = new BufferedReader(new FileReader(fileloc));
		    String text = null;

		    while ((text = reader.readLine()) != null) {
		        list.put("a", Integer.parseInt(text));
		    }
		} catch (FileNotFoundException e) {
		    e.printStackTrace();
		} catch (IOException e) {
		    e.printStackTrace();
		} finally {
		    try {
		        if (reader != null) {
		            reader.close();
		        }
		    } catch (IOException e) {
		    }
		}

		//parse list to this

		HashMap tester = new HashMap();

		tester.put("1", "a");
		tester.put("2", "b");
		return tester;

 	}


 	protected String printLayerJSON (String fileloc) {
  		BufferedReader reader = null;
 		String returntext = "";
		try {
		    reader = new BufferedReader(new FileReader(fileloc));
		    String text = null;

		    while ((text = reader.readLine()) != null) {
		    	returntext = returntext + text + "\n";
		    }
		} catch (FileNotFoundException e) {
		    e.printStackTrace();
		} catch (IOException e) {
		    e.printStackTrace();
		} finally {
		    try {
		        if (reader != null) {
		            reader.close();
		        }
		    } catch (IOException e) {
		    }
		}
		return returntext;
 	}

 	protected String parseHashMap (HashMap newJSON) throws IOException {

 		//PrintWriter writer = new PrintWriter(".\\webapps\\DiplomacyExplorer2\\jsonFile\\jsonLayerFile.json", "UTF-8");		

			//writer.println("The first line");
			//writer.close();
			return "success writing the files";
		

 	}

	public String getLayerInfo() {
		String fileloc = ".\\webapps\\DiplomacyExplorer2\\jsonFile\\jsonLayerFile.json";
		HashMap tester = new HashMap();


		//successfactor = this.parseHashMap(tester);
		String successfactor = this.printLayerJSON(fileloc);



		return successfactor;

	}
}