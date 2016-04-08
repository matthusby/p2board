defmodule P2board.Router do
  use P2board.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", P2board do
    pipe_through :browser # Use the default browser stack

		get "auth", PageController, :auth
    get "*path", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", P2board do
  #   pipe_through :api
  # end
end
