require 'test_helper'

class PackListsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @pack_list = pack_lists(:one)
  end

  test "should get index" do
    get pack_lists_url, as: :json
    assert_response :success
  end

  test "should create pack_list" do
    assert_difference('PackList.count') do
      post pack_lists_url, params: { pack_list: {  } }, as: :json
    end

    assert_response 201
  end

  test "should show pack_list" do
    get pack_list_url(@pack_list), as: :json
    assert_response :success
  end

  test "should update pack_list" do
    patch pack_list_url(@pack_list), params: { pack_list: {  } }, as: :json
    assert_response 200
  end

  test "should destroy pack_list" do
    assert_difference('PackList.count', -1) do
      delete pack_list_url(@pack_list), as: :json
    end

    assert_response 204
  end
end
