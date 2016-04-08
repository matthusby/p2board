defmodule P2board.WPOauth do
	use OAuth2.Strategy

	def client do
		OAuth2.Client.new([
			strategy: __MODULE__,
			client_id: Application.get_env(:p2board, :client_id),
			client_secret: Application.get_env(:p2board, :client_secret),
			redirect_uri: "http://localhost:4000/auth/",
			site: "https://public-api.wordpress.com",
			authorize_url: "https://public-api.wordpress.com/oauth2/authorize",
			token_url: "https://public-api.wordpress.com/oauth2/token"
			])
	end

	def authorize_url!(params \\ []) do
    client()
    |> OAuth2.Client.authorize_url!(params)
  end

	# you can pass options to the underlying http library via `options` parameter
 def get_token!(params \\ [], headers \\ [], options \\ []) do
	 OAuth2.Client.get_token!(client(), params, headers, options)
 end

 # Strategy Callbacks

 def authorize_url(client, params) do
	 OAuth2.Strategy.AuthCode.authorize_url(client, params)
 end

	def get_token(client, params, headers) do
		client
		|> OAuth2.Strategy.AuthCode.get_token(params, headers)
	end
end
