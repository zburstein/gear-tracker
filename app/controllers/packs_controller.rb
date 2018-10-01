class PacksController < ApplicationController
  before_action :set_pack, only: [:show, :update, :destroy, :categories]

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
    @pack = Pack.new(pack_params)

    if @pack.save
      render "show.json.jbuilder"
    else
      render json: @pack.errors.full_messages.unshift("#{controller_name.capitalize} failed to #{action_name}"), status: :unprocessable_entity
    end
  end

  # PATCH/PUT /packs/1
  def update
    if @pack.update(pack_params)
      render json: @pack
    else
      render json: @pack.errors.full_messages.unshift("#{controller_name.capitalize} failed to #{action_name}"), status: :unprocessable_entity
    end
  end

  # DELETE /packs/1
  def destroy
    @pack.destroy
  end

  def categories
    render json: @pack.categories
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

    def send_error

    end
end
