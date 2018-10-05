class PacksController < ApplicationController

  include DeviseTokenAuth::Concerns::SetUserByToken
  include DeviseTokenAuth::Concerns::ResourceFinder
  include DeviseTokenAuth::Concerns::ResourceFinder


  before_action :set_pack, only: [:show, :update, :destroy, :categories]
  #before_action :authenticate_user!
  #before_action :set_user_by_token

  # GET /packs
  def index
    render "index.json.jbuilder"
  end

  # GET /packs/1
  def show
    render "show.json.jbuilder"
  end

  # POST /packs
  def create
    @pack = Pack.new()
    if @pack.save
      render "show.json.jbuilder"
    else
      send_errors
    end
  end

  # PATCH/PUT /packs/1
  def update
    if @pack.update(pack_params)
      render json: @pack
    else
      send_errors
    end
  end

  # DELETE /packs/1
  def destroy
    @pack.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pack
      @pack = Pack.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def pack_params
      params.require(:pack).permit(:name, :display_metric)
    end

    def send_errors
      render json: @pack.errors.full_messages.unshift("#{controller_name.capitalize} failed to #{action_name}"), status: :unprocessable_entity
    end
end
