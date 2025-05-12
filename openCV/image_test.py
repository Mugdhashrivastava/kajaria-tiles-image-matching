import cv2

# Load an image
image = cv2.imread("input.jpg")

# Show the image
cv2.imshow("My Image", image)

# Wait until you press any key
cv2.waitKey(0)

# Close all windows
cv2.destroyAllWindows()




# to run : python image_test.py
