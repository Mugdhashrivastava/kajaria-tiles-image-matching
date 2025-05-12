import cv2

# Load image in color
image = cv2.imread("input.jpg")

# Convert to grayscale
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Show grayscale image
cv2.imshow("Grayscale Image", gray_image)

# Wait for any key
cv2.waitKey(0)

# Close all windows
cv2.destroyAllWindows()



# to run : python image_test2.py