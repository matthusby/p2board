defmodule P2board.PageController do
  use P2board.Web, :controller

  def index(conn, _params) do
		case conn.cookies["token"] do
			nil ->
				url = P2board.WPOauth.authorize_url!

				conn
				|> assign(:url, url)
				|> render("index.html")
			_ ->
				conn
		    |> render("loggedin.html")
		end
  end

	def auth(conn, params) do
		token = P2board.WPOauth.get_token!(code: params["code"])
		IO.puts inspect token
		resource = OAuth2.AccessToken.get!(token, "https://public-api.wordpress.com/rest/v1.1/me").body
		IO.puts inspect resource

		conn
		|> put_session(:token, token)
		|> Plug.Conn.put_resp_cookie("token", token.access_token, [{:http_only, false}])
		|> redirect(to: "/")
	end
end
