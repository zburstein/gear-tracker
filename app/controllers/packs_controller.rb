class PacksController < ApplicationController
  before_action :set_pack, only: [:show, :update, :destroy]

  # GET /packs
  def index
    @packs = PackList.all.order(created_at: "ASC")
    render json: @packs, except: [:created_at, :updated_at, :weight_in_grams, :display_metric] #include: {:categories => {:include => :gear_items}}, except: [:created_at, :updated_at]
  end

  # GET /packs/1
  def show
    render json: @pack, include: {:categories => {:include => :gear_items}}, except: [:created_at, :updated_at]
  end

  # POST /packs
  def create
    @pack = PackList.new(pack_params)

    if @pack.save
      render json: @pack, include: {:categories => {:include => :gear_items}}, except: [:created_at, :updated_at], status: :created, location: @pack
    else
      render json: @pack.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /packs/1
  def update
    if @pack.update(pack_params)
      render json: @pack
    else
      render json: @pack.errors, status: :unprocessable_entity
    end
  end

  # DELETE /packs/1
  def destroy
    @pack.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pack
      @pack = PackList.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def pack_params
      params.require(:pack).permit(:name, :display_metric)
    end
end
