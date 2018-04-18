class PackListsController < ApplicationController
  before_action :set_pack_list, only: [:show, :update, :destroy]

  # GET /pack_lists
  def index
    @pack_lists = PackList.all.order(created_at: "ASC")
    render json: @pack_lists, except: [:created_at, :updated_at, :weight_in_grams, :display_metric] #include: {:categories => {:include => :gear_items}}, except: [:created_at, :updated_at]
  end

  # GET /pack_lists/1
  def show
    render json: @pack_list, include: {:categories => {:include => :gear_items}}, except: [:created_at, :updated_at]
  end

  # POST /pack_lists
  def create
    @pack_list = PackList.new(pack_list_params)

    if @pack_list.save
      render json: @pack_list, include: {:categories => {:include => :gear_items}}, except: [:created_at, :updated_at], status: :created, location: @pack_list
    else
      render json: @pack_list.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /pack_lists/1
  def update
    if @pack_list.update(pack_list_params)
      render json: @pack_list
    else
      render json: @pack_list.errors, status: :unprocessable_entity
    end
  end

  # DELETE /pack_lists/1
  def destroy
    @pack_list.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pack_list
      @pack_list = PackList.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def pack_list_params
      params.require(:pack_list).permit(:name, :display_metric)
    end
end
