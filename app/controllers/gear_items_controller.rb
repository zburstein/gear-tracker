class GearItemsController < ApplicationController
  before_action :set_gear_item, only: [:show, :update, :destroy]
  before_action :authenticate_user!


  # GET /gear_items
  def index
    @gear_items = GearItem.all

    render json: @gear_items
  end

  # GET /gear_items/1
  def show
    render json: @gear_item
  end

  # POST /gear_items
  def create
    @gear_item = GearItem.new(gear_item_params)
    if @gear_item.save
      render json: @gear_item, status: :created, location: @gear_item
    else
      send_errors
    end
  end

  # PATCH/PUT /gear_items/1
  def update
    if @gear_item.update(gear_item_params)
      render json: @gear_item
    else
      send_errors
    end
  end

  # DELETE /gear_items/1
  def destroy
    @gear_item.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_gear_item
      @gear_item = GearItem.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def gear_item_params
      params.require(:gear_item).permit(:category_id, :name, :description, :weight_in_grams, :display_metric, :display_weight, :quantity, :worn, :favorite, :consumable, :consumable_base_weight, :picture, :link)
    end

    def send_errors
      render json: @gear_item.errors.full_messages.unshift("#{controller_name.capitalize} failed to #{action_name}"), status: :unprocessable_entity
    end
end
