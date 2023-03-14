const canvas = document.getElementsByTagName('canvas')[0]
const contextOption = canvas.getContext('2d')

const indicatorOption = document.querySelector('#intersecting #indicator')

const line1Option = document.forms.namedItem('line1')
const line2Option = document.forms.namedItem('line2')

if (!contextOption) throw 'Failed to get canvas context.'
if (!indicatorOption) throw 'Failed to get intersecting indicator.'
if (!line1Option || !line2Option) throw 'Failed to get coordinate forms.'

const context = contextOption
const indicator = indicatorOption
const line1 = line1Option
const line2 = line2Option

const line1DestinationXOption = line1.elements.namedItem('destinationX')
const line1OriginXOption = line1.elements.namedItem('originX')
const line2DestinationXOption = line2.elements.namedItem('destinationX')
const line2OriginXOption = line2.elements.namedItem('originX')

if (
  !(line1DestinationXOption instanceof HTMLInputElement) ||
  !(line1OriginXOption instanceof HTMLInputElement) ||
  !(line2DestinationXOption instanceof HTMLInputElement) ||
  !(line2OriginXOption instanceof HTMLInputElement)
) throw 'Failed to get coordinate inputs.'

const degrees = /** @type const **/({
  180: Math.PI,
  360: Math.PI * 2
})

const line1DestinationXInput = line1DestinationXOption
const line1OriginXInput = line1OriginXOption
const line2DestinationXInput = line2DestinationXOption
const line2OriginXInput = line2OriginXOption

class Range {
  /** @type number */
  destination

  /** @type number */
  origin

  /**
   * @param {number} origin 
   * @param {number} destination 
   */
  constructor(origin, destination) {
    [this.origin, this.destination] = /** @type [number, number] **/([origin, destination]).sort((a, b) => a - b)
  }

  /**
   * @param {Range} range 
   */
  intersects(range) {
    return this.origin > range.origin && this.origin < range.destination
      || this.destination > range.origin && this.destination < range.destination
      || this.origin <= range.origin && this.destination >= range.destination
  }
}

draw()

document.body.addEventListener('input', draw)

function draw() {
  const line1DestinationX = parseInt(line1DestinationXInput.value)
  const line1OriginX = parseInt(line1OriginXInput.value)
  const line2DestinationX = parseInt(line2DestinationXInput.value)
  const line2OriginX = parseInt(line2OriginXInput.value)

  context.beginPath()
  context.clearRect(0, 0, canvas.width, canvas.height)
  // two overlapping squares
  // context.fillStyle = 'rgb(200, 0, 0)'
  // context.fillRect(10, 10, 50, 50)
  // context.fillStyle = 'rgba(0, 0, 200, 0.5)'
  // context.fillRect(30, 30, 50, 50)

  // triangle
  // context.beginPath()
  // context.moveTo(75, 50)
  // context.lineTo(100, 75)
  // context.lineTo(100, 25)
  // context.fill()

  // smiley face
  // context.beginPath()
  // context.arc(75, 75, 50, 0, degrees[360], true) // Outer circle
  // context.moveTo(110, 75)
  // context.arc(75, 75, 35, 0, degrees[180], false) // Mouth (clockwise)
  // context.moveTo(65, 65)
  // context.arc(60, 65, 5, 0, degrees[360], true) // Left eye
  // context.moveTo(95, 65)
  // context.arc(90, 65, 5, 0, degrees[360], true) // Right eye
  // context.stroke()

  // lines from inputs
  context.strokeStyle = 'blue'
  context.moveTo(line1OriginX, 75)
  context.lineTo(line1DestinationX, 75)
  context.stroke()
  context.beginPath()
  context.strokeStyle = 'orange'
  context.moveTo(line2OriginX, 75)
  context.lineTo(line2DestinationX, 75)
  context.stroke()

  indicator.classList.toggle(
    'on',
    new Range(line1OriginX, line1DestinationX).intersects(new Range(line2OriginX, line2DestinationX))
  )
}

export { }
