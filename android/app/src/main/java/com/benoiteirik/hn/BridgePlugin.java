package com.benoiteirik.hn;

import android.os.AsyncTask;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import java.io.IOException;

@CapacitorPlugin(name = "Bridge")
public class BridgePlugin extends Plugin {
    private String baseURL = "https://www.hommenouveau.fr/";
    private JSObject json;

    // Bridge data between back and front
    private PluginCall homeMetadataCall;
    private PluginCall articleDataCall;
    private PluginCall categoriesDataCall;
    private PluginCall explorerMetadataCall;


    @PluginMethod()
    public void echo(PluginCall call) {
        String value = call.getString("value");
        Log.d("MSG:", " " + value);
        JSObject ret = new JSObject();
        ret.put("value", value);
        call.resolve(ret);
    }

    @PluginMethod()
    public void  getHomeMetadata(PluginCall call) {
        homeMetadataCall = call;
        AsyncTask<String, Void, Void> metadata = new HomeArticlesMetadata().execute(baseURL);
    }

    @PluginMethod()
    public void  getArticleData(PluginCall call) {
        articleDataCall = call;
        String url = articleDataCall.getString("url");
        AsyncTask<String, Void, Void> articleData = new ArticleData().execute(url);
    }

    @PluginMethod()
    public void getExplorerMetadata(PluginCall call) {
        explorerMetadataCall = call;
        String url = explorerMetadataCall.getString("url");
        AsyncTask<String, Void, Void> metadata = new ExplorerArticlesMetadata().execute(url);
    }

    private class HomeArticlesMetadata extends AsyncTask<String, Void, Void> {

        @Override
        protected Void doInBackground(String... params) {
            try {
                Document doc = Jsoup.connect(params[0]).timeout(0).get();
                json = new JSObject();  // Type of variable not declared here because need to transfer data to main thread
                int index = 0;
                JSONArray categories = new JSONArray();
                JSONArray primaryArticles = new JSONArray();
                JSONArray secondaryArticles = new JSONArray();

                // Get categories
                Elements categoriesElements = doc.select("#menuMobile ul:eq(1) li");
                for (Element el : categoriesElements) {
                    JSONObject infoCategory = new JSONObject();
                    infoCategory.put("id", index);
                    infoCategory.put("name", el.select("a").text());
                    infoCategory.put("url", el.select("a").attr("href"));

                    categories.put(infoCategory);
                    index++;
                }

                // Get swiper articles
                Elements primaryArticleElements = doc.select("#aLaUne #diapo .viewport .overview li");
                index = 0;
                for (Element el : primaryArticleElements) {
                    JSONObject infoArticle = new JSONObject();
                    infoArticle.put("id", index);
                    infoArticle.put("url", el.select(".titreDiapo").attr("href"));
                    infoArticle.put("img", el.select("a img").attr("src"));
                    infoArticle.put("title", el.select(".titreDiapo").text());
                    infoArticle.put("detail", el.select("div div").text());
                    infoArticle.put("description", el.select("#accroche").first().ownText());

                    primaryArticles.put(infoArticle);
                    index++;
                }

                // Get last articles
                Elements secondaryArticleElements = doc.select("#aLaUne-suite article");
                index = 0;
                for (Element el : secondaryArticleElements) {
                    JSONObject infoArticle = new JSONObject();
                    infoArticle.put("id", index);
                    infoArticle.put("url", el.select("a").attr("href"));
                    infoArticle.put("img", el.select("a .conteneurImg img").attr("src"));
                    infoArticle.put("title", el.select("a h1").text());
                    infoArticle.put("detail", el.select("a .detailBillet").text());
                    infoArticle.put("description", el.select("a .fck p").text());

                    secondaryArticles.put(infoArticle);
                    index++;
                }

                // Join the json object
                json.put("categories", categories);
                json.put("primaryArticles", primaryArticles);
                json.put("secondaryArticles", secondaryArticles);
            } catch (IOException | JSONException e) {
                System.out.println(e);
            }

            return null;
        }

        protected void onPostExecute(Void result) {
            homeMetadataCall.resolve(json);
        }
    }

    private class ArticleData extends AsyncTask<String, Void, Void> {

        @Override
        protected Void doInBackground(String... params) {
            try {
                Document doc = Jsoup.connect(params[0]).timeout(0).get();

                json = new JSObject();

                // Get swiper articles
                Elements el = doc.select("#contenu #texte");
                JSONObject article = new JSONObject();
                json.put("title", el.select("h1").text());
                json.put("content", el.select(".fck").html());

            } catch (IOException e) {
                System.out.println(e);
            }

            return null;
        }

        protected void onPostExecute(Void result) {
            articleDataCall.resolve(json);
        }
    }

    private class ExplorerArticlesMetadata extends AsyncTask<String, Void, Void> {
        @Override
        protected Void doInBackground(String... params) {
            try {
                Document doc = Jsoup.connect(params[0]).timeout(0).get();
                json = new JSObject();  // Type of variable not declared here because need to transfer data to main thread
                int index = 0;
                JSONArray articles = new JSONArray();

                // Get last articles
                Elements articlesElements = doc.select("#plusCommentes article");
                for (Element el : articlesElements) {
                    JSONObject infoArticle = new JSONObject();
                    infoArticle.put("id", index);
                    infoArticle.put("url", el.select("a").attr("href"));
                    infoArticle.put("img", el.select("a .conteneurImg img").attr("src"));
                    infoArticle.put("title", el.select("a h1").text());
                    infoArticle.put("detail", el.select("a .detailBillet").text());
                    infoArticle.put("description", el.select("a .fck p").text());

                    articles.put(infoArticle);
                    index++;
                }

                // Join the json object
                json.put("articles", articles);
            } catch (IOException | JSONException e) {
                System.out.println(e);
            }

            return null;
        }

        protected void onPostExecute(Void result) {
            Log.d("MSG:", json.toString());
            explorerMetadataCall.resolve(json);
        }
    }
}
