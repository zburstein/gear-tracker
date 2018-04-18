require 'test_helper'

class GearItemsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @gear_item = gear_items(:one)
  end

  test "should get index" do
    get gear_items_url, as: :json
    assert_response :success
  end

  test "should create gear_item" do
    assert_difference('GearItem.count') do
      post gear_items_url, params: { gear_item: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show gear_item" do
    get gear_item_url(@gear_item), as: :json
    assert_response :success
  end

  test "should update gear_item" do
    patch gear_item_url(@gear_item), params: { gear_item: {  } }, as: :json
    assert_response 200
  end

  test "should destroy gear_item" do
    assert_difference('GearItem.count', -1) do
      delete gear_item_url(@gear_item), as: :json
    end

    assert_response 204
  end
end
